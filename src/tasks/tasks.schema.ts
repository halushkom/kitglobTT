import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TaskStatus } from './tasks.model';
import { User } from '../auth/user.schema';

export type TaskDocument = HydratedDocument<TaskModel>;

@Schema({ timestamps: true })
export class TaskModel {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  project: string;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.NEW })
  status: TaskStatus;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
  })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
