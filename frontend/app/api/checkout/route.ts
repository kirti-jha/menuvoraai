import { NextResponse } from "next/server";
import { sql, initializeNeonDatabase } from "@/lib/neon";

export async function POST(req: Request) {
  try {
    const { plan, amount, name, email } = await req.json();

    const orderId = `ORD_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    if (sql) {
      try {
        await initializeNeonDatabase();
        await sql`
          INSERT INTO orders (order_id, plan_name, amount, customer_name, customer_email, status)
          VALUES (${orderId}, ${plan || 'Website'}, ${amount || 100}, ${name || 'Customer'}, ${email || ''}, 'COMPLETED');
        `;
        console.log(`✅ [Neon DB] Order ${orderId} saved to Neon PostgreSQL database!`);
      } catch (err) {
        console.error("Neon DB order insert error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Order processed successfully",
      data: {
        orderId,
        plan,
        amount,
        name,
        email,
        status: "COMPLETED",
        database: sql ? "Neon PostgreSQL" : "Local Memory",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Checkout failed" },
      { status: 500 }
    );
  }
}
