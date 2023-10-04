import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})
export class Article {

  @Prop()
  title: string;

  @Prop({ type: Date })
  date: Date;

  @Prop([String])
  categories: string[];

  @Prop([String])
  tags: string[];

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop({ type: String })
  image: string;

}

export const ArticleSchema = SchemaFactory.createForClass(Article);
