import styles from './ui.module.scss';
import { Get } from '../model/';
import { useEffect, useState } from 'react';
import { EventData } from '@/shared/interfaces/event';
import TicketIcon from '../../../../../public/icon/ModeratorCardTicketIcon.svg';
import Image from 'next/image';
import { Gapped } from '@/shared/gapped/ui/ui';
import { parseISO } from 'date-fns';

export const PublishedEventCard = () => {
  const [postData, setPostData] = useState<EventData[] | null>(null);
  useEffect(() => {
    const getEvent = async () => {
      const fetchEvent: EventData[] = await Get();
      setPostData(fetchEvent);
    };
    getEvent();
  }, []);
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  return (
    <>
      <div className={styles.cardRenderWrap}>
        {postData &&
          postData.map((event: EventData) => {
            const eventDate = parseISO(event.date);
            const monthIndex = eventDate.getMonth();
            const formattedDate = `${eventDate.getDate()} ${months[monthIndex]}`;
            return (
              <div key={event.id} className={styles.card}>
                <div className={styles.cover}>
                  <div
                    style={{
                      backgroundImage: `url(${event.cover})`,
                      display: 'block',
                    }}
                    className={styles.bg}>
                    <span className={styles.buttonDate}>{formattedDate}</span>
                  </div>
                </div>
                <main className={styles.info}>
                  <Gapped vertical gap="4px">
                    <h2 className={styles.cardTitle}>{event.name}</h2>
                    <div className={styles.ticket}>
                      <Image src={TicketIcon} width={18} height={18} alt="Иконка билета" />
                      {(() => {
                        if (event.total_tickets) {
                          return `${event.total_tickets} билетов`;
                        } else return `Билеты не поступили в продажу`;
                      })()}
                    </div>
                  </Gapped>
                  <h3
                    title={event.platform ? event.platform.name : 'Улица не найдена'}
                    className={styles.platform}>
                    {event.platform ? event.platform.name : 'Место не найдено'}
                  </h3>
                </main>
              </div>
            );
          })}
      </div>
    </>
  );
};
