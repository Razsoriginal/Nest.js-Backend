import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class User {

  @Prop({ unique: true })
  token: number;

  @Prop({ length: 100 })
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ enum: ['Male', 'Female'] })
  gender: string;

  @Prop({ enum: ['Less than 15', '15 to 25', '26 to 40', 'Above 40'] })
  ageGroup: string;

  @Prop({ length: 20 })
  phoneNumber: string;

  @Prop({ enum: ['English', 'Urdu', 'Gujarati'] })
  preferredLanguage: string;

  @Prop({ length: 100 })
  country: string;

  @Prop({ length: 100 })
  state: string;

  @Prop({ length: 100 })
  city: string;

  @Prop({ length: 10 })
  zipCode: string;

  @Prop()
  userClass: string;

}

export const UserSchema = SchemaFactory.createForClass(User)