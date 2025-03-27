import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReservationsDocument } from './models/reservations.schema';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Resolver(() => ReservationsDocument)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => ReservationsDocument)
  createReservation(
    @Args('createReservationInput')
      createReservationInput: CreateReservationDto,
  ) {
    return this.reservationsService.create(createReservationInput);
  }

  @Query(() => [ReservationsDocument], { name: 'reservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Query(() => ReservationsDocument, { name: 'reservation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.findOne(id);
  }

  @Mutation(() => ReservationsDocument)
  removeReservation(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.findOneAndDelete({ _id: id });
  }
}