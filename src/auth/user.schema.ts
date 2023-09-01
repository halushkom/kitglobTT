import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TaskModel } from 'src/tasks/tasks.schema';

export type UsertDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'TaskModel' }],
  })
  tasks: TaskModel[];
}

export const UserSchema = SchemaFactory.createForClass(User);
