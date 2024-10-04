/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 */

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { BaseRepository } from '@/utils/generics/base-repository';

import {
  Conversation,
  CONVERSATION_POPULATE,
  ConversationFull,
  ConversationPopulate,
} from '../schemas/conversation.schema';

@Injectable()
export class ConversationRepository extends BaseRepository<
  Conversation,
  ConversationPopulate,
  ConversationFull
> {
  constructor(
    @InjectModel(Conversation.name) readonly model: Model<Conversation>,
    readonly eventEmitter: EventEmitter2,
  ) {
    super(model, Conversation, CONVERSATION_POPULATE, ConversationFull);
    super.setEventEmitter(eventEmitter);
  }

  /**
   * Marks a conversation as ended by setting its `active` status to `false`.
   *
   * @param convo The conversation or full conversation object to be ended.
   *
   * @returns A promise resolving to the result of the update operation.
   */
  async end(convo: Conversation | ConversationFull) {
    return await this.updateOne(convo.id, { active: false });
  }

  /**
   * Finds a single conversation by a given criteria and populates the related fields: `sender`, `current`, and `next`.
   *
   * @param criteria The search criteria, either a string or a filter query.
   *
   * @returns A promise resolving to the populated conversation full object.
   */
  async findOneAndPopulate(criteria: string | FilterQuery<Conversation>) {
    const query = this.findOneQuery(criteria).populate([
      'sender',
      'current',
      'next',
    ]);
    return await this.executeOne(query, ConversationFull);
  }
}
