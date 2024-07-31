import { eq, and, or, asc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db, timer, Task, newTask } from "@/lib/Logic/schema-timer";

/**The GET function is used to fetch data from the database . In this function I have defined a database table in the schema file and
 * also inferred its datatype from InferSelectMdodel and simply imported it into the route.ts file. This way I don't have to manually define the
 * data type. the res variable is receiving data from the table tasktable
 */
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
        .from(timer)
        .where(eq(timer.user_id, user_id))
        .orderBy(asc(timer.id));

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
        .insert(timer)
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
        .delete(timer)
        .where(
          eq(timer.id, Id as unknown as number) && eq(timer.user_id, user_id)
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
    if (req.id && req.user_id && req.starttime) {
      const res = await db
        .update(timer)
        .set({ starttime: req?.starttime })
        .where(eq(timer.id, req.id) && eq(timer.user_id, req.user_id))
        .returning();
      return NextResponse.json({
        message: "Timer Time updated successfully",
        data: res,
      });
    } else if (req.id && req.user_id && req.stoptime) {
      const res = await db
        .update(timer)
        .set({ stoptime: req?.stoptime })
        .where(eq(timer.id, req.id) && eq(timer.user_id, req.user_id))
        .returning();
      return NextResponse.json({
        message: "Stopwatch Time updated successfully",
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
