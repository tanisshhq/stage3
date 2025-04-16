import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import Budget from '@/models/Budget';

export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const budget = await Budget.create(body);
  return NextResponse.json(budget);
}

