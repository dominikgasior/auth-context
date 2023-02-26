import { Injectable } from '@nestjs/common';
import { Subscriber } from '../subscriber';
import { SubscriberId } from '../subscriber-id';

@Injectable()
export class SubscriberRepository {
  private readonly subscribers: Map<string, Subscriber> = new Map();

  async save(subscriber: Subscriber): Promise<void> {
    this.subscribers.set(subscriber.id.toString(), subscriber);
  }

  async get(id: SubscriberId): Promise<Subscriber> {
    const subscriber = this.subscribers.get(id.toString());

    if (!subscriber) {
      return new Subscriber(id);
    }

    return subscriber;
  }
}
