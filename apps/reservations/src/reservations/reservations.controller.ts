import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  private readonly logger = new Logger(ReservationsController.name);
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    this.logger.log(
      `Creating new Reservation ${JSON.stringify(createReservationDto)}`,
    );
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll() {
    this.logger.log(`Finding all Reservations`);
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`Finding Reservation ${id}`);
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    this.logger.log(
      `Updating Reservation ${id} with values ${JSON.stringify(updateReservationDto)}`,
    );
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`Deleting Reservation ${id}`);
    return this.reservationsService.remove(id);
  }
}
