import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})
export class Quiz {

  @Prop()
  title: String;

  @Prop()
  subject: String;

  @Prop()
  class: String;

  @Prop()
  formLink: String;

  @Prop()
  description: String;

  @Prop()
  tokenFormField: String;

  @Prop()
  lectureLink: string;

  @Prop()
  imageLink: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
