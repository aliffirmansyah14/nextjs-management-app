import { TaskStatus } from "@/generated/prisma/enums";

export type TaskStatusParams = TaskStatus | "ALL";

export type SortByParams = "updated" | "created" | "name";
