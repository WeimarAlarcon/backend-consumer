import { IsBoolean, IsObject, IsOptional, IsString } from "class-validator";

export class CreateNotificacionDto {

    @IsOptional()
    fechaHora: Date;

    @IsString()
    mensaje: string;

    @IsBoolean()
    estado: boolean;

    @IsObject()
    persona: any;
}
