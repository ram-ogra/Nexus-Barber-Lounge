import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  price: string;
  date: string;
  time: string;
  createdAt: string;
  status: "confirmed" | "pending" | "cancelled";
}

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(BOOKINGS_FILE);
    } catch {
      await fs.writeFile(BOOKINGS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error ensuring data file:", err);
    throw new Error("Storage initialization failed");
  }
}

async function readBookings(): Promise<Booking[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(BOOKINGS_FILE, "utf-8");
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

async function writeBookings(bookings: Booking[]): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

function generateId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NBL-${timestamp}-${random}`;
}

const VALID_SERVICES: Record<string, string> = {
  "Haircut": "₹599",
  "Beard Styling": "₹399",
  "Hair + Beard": "₹799",
  "Facial": "₹899",
};

const VALID_TIMES = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM",
  "11:00 AM","11:30 AM","12:00 PM","12:30 PM",
  "1:00 PM","1:30 PM","2:00 PM","2:30 PM",
  "3:00 PM","3:30 PM","4:00 PM","4:30 PM",
  "5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, service, date, time } = body;
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length < 2)
      errors.push("Name must be at least 2 characters.");
    if (!phone || typeof phone !== "string") {
      errors.push("Phone number is required.");
    } else {
      const cleanPhone = phone.replace(/\s/g, "");
      if (!/^[6-9]\d{9}$/.test(cleanPhone))
        errors.push("Enter a valid 10-digit Indian mobile number.");
    }
    if (!service || !VALID_SERVICES[service])
      errors.push("Please select a valid service.");
    if (!date || typeof date !== "string") {
      errors.push("Date is required.");
    } else {
      const bookingDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(bookingDate.getTime())) errors.push("Invalid date.");
      else if (bookingDate < today) errors.push("Booking date cannot be in the past.");
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 30);
      if (bookingDate > maxDate) errors.push("Cannot book more than 30 days in advance.");
    }
    if (!time || !VALID_TIMES.includes(time))
      errors.push("Please select a valid time slot.");

    if (errors.length > 0)
      return NextResponse.json({ success: false, errors }, { status: 400 });

    const bookings = await readBookings();
    const duplicate = bookings.find(
      (b) => b.date === date && b.time === time && b.status !== "cancelled"
    );
    if (duplicate)
      return NextResponse.json(
        { success: false, errors: ["This slot is already booked. Please choose another time."] },
        { status: 409 }
      );

    const newBooking: Booking = {
      id: generateId(),
      name: name.trim(),
      phone: phone.replace(/\s/g, ""),
      service: service.trim(),
      price: VALID_SERVICES[service],
      date,
      time,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    bookings.push(newBooking);
    await writeBookings(bookings);

    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const waMessage = encodeURIComponent(
      `✂️ *New Booking – Nexus Barber Lounge*\n\n` +
      `📋 *Booking ID:* ${newBooking.id}\n` +
      `👤 *Name:* ${newBooking.name}\n` +
      `📞 *Phone:* ${newBooking.phone}\n` +
      `💈 *Service:* ${newBooking.service} (${newBooking.price})\n` +
      `📅 *Date:* ${formattedDate}\n` +
      `⏰ *Time:* ${newBooking.time}\n\n` +
      `_Please confirm this booking. Thank you!_`
    );

    const whatsappUrl = `https://wa.me/919376838329?text=${waMessage}`;

    return NextResponse.json(
      { success: true, booking: newBooking, whatsappUrl, message: "Booking confirmed!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json(
      { success: false, errors: ["Server error. Please try again."] },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await readBookings();
    return NextResponse.json({ success: true, count: bookings.length, bookings }, { status: 200 });
  } catch (err) {
    console.error("Fetch bookings error:", err);
    return NextResponse.json({ success: false, errors: ["Failed to retrieve bookings."] }, { status: 500 });
  }
}
