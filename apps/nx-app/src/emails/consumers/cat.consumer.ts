import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { EVENTS, QUEUES } from '../../shared/constants';
import { CatEvent } from '../../cats/entities/cat.event';

@Processor(QUEUES.CAT)
export class CatEventsConsumer {
  @Process(EVENTS.CAT_CREATED)
  async onCreated(job: Job<CatEvent>): Promise<void> {
    const { data, id } = job;

    Logger.log(`Received event with ID ${id} and payload ${data}.`);
    // I imagined that I would inject the email service here and
    // then send some advertising email or something in an
    // uncoupled way.
    // emailService.subscribeCatToMails(data.cat)

    return;
  }
}
