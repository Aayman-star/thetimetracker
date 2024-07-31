import { eq, and, or, asc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db, stopwatch, Task, newTask } from "@/lib/Logic/schema-stopwatch";

type task = {
  id: number;
  user_id: string;
  tasktext: string;
  starttime?: number;
  stoptime?: number;
  created_At: Date;
};
export const GET = async (request: NextRequest) => {
  const req = request.nextUrl;
  const user_id = req.searchParams.get("user_id") as string;
  // console.log("get payload", req);
  //const req = await request.json();
  if (user_id) {
    try {
      const tasks: Array<Task> = await db
        .select()
        .from(stopwatch)
        .where(eq(stopwatch.user_id, user_id))
        .orderBy(asc(stopwatch.id));

      //console.log(todos);
      if (tasks.length) {
        return NextResponse.json({ tasks }, { status: 200 });
      } else {
        return NextResponse.json({ message: "No tasks at the moment" });
      }
    } catch (err) {
      console.log((err as { message: string }).message);
      /*throw new Error("Something went wrong");*/
    }
  } else {
    return NextResponse.json({ message: "User not logged in..." });
  }
};
/**This function is for sending data to the table named tasktable in the database. from the client side the text for the task is received,
 * the is_complete status is added by default,so is the time stamp. The point to remember is that apis deal with data in json format.
 * so the data sent to the api should be in json format as the data received from the api is in json format as well.
 */
export const POST = async (request: NextRequest) => {
  const req = await request.json();
  // const user_id = req.searchParams.get("user_id") as string;
  try {
    /**Check if the user has sent the task text */
    if (req.user_id) {
      const res = await db
        .insert(stopwatch)
        .values({
          user_id: req.user_id,
          tasktext: req.tasktext,
          created_at: new Date(),
        })
        .returning();
      //console.log(res);
      return NextResponse.json({
        message: "Task added successfully",
        data: res,
      });
    } else {
      return NextResponse.json({ message: "Please enter a task to proceed" });
      /*throw new Error("Please enter a task");*/
    }
  } catch (err) {
    console.log((err as { message: string }).message);
  }
};

/**This the delete function for deleting the task from the database. The id of the task is received from the client side. */
export const DELETE = async (request: NextRequest) => {
  const req = request.nextUrl;
  const Id = req.searchParams.get("id");
  const user_id = req.searchParams.get("user_id") as string;

  try {
    if (Id && user_id) {
      const res = await db
        .delete(stopwatch)
        .where(
          eq(stopwatch.id, Id as unknown as number) &&
            eq(stopwatch.user_id, user_id)
        )
        .returning();

      return NextResponse.json(
        { Message: `Data deleted successfully` },
        { status: 200 }
      );
    } else {
      if ("product_id") {
        throw new Error(`Login required to procees`);
      } else {
        throw new Error(`Product not found`);
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { Message: `Failed to remove data` },
      { status: 405 }
    );
  }
};
/**This is a patch function to  update the is_complete status of the task */
export const PATCH = async (request: NextRequest) => {
  const req = await request.json();
  // const user_id = req.searchParams.get("user_id") as string;
  console.log("payload", req);
  try {
    if (req.id && req.user_id && req?.starttime) {
      const res = await db
        .update(stopwatch)
        .set({ starttime: req?.starttime })
        .where(eq(stopwatch.id, req.id) && eq(stopwatch.user_id, req.user_id))
        .returning();
      return NextResponse.json({
        message: "starttime Time in stopwatch updated successfully",
        data: res,
      });
    } else if (req.id && req.user_id && (req?.stoptime || !req?.stoptime)) {
      console.log("I am in the if statement of req stoptime");
      const res = await db
        .update(stopwatch)
        .set({
          stoptime: req?.stoptime > 0 ? req?.stoptime : null,
        })
        .where(eq(stopwatch.id, req.id) && eq(stopwatch.user_id, req.user_id))
        .returning();
      return NextResponse.json({
        message: "Stoptime Time in stopwatch updated successfully",
        data: res,
      });
    } else {
      return NextResponse.json({ message: "Please enter a task" });
    }
  } catch (err) {
    console.log((err as { message: string }).message);
  }
  return NextResponse.json({ message: `Time updated successfully` });
};
