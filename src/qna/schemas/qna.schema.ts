import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})
export class Qna {

  @Prop()
  title: string;

  @Prop([String])
  categories: string[]; 

  @Prop([String])
  tags: string[];

  @Prop()
  description: string;

  @Prop()
  content: string;

}

export const QnaSchema = SchemaFactory.createForClass(Qna);
