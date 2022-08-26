import React from 'react';
import { notification } from 'antd';

type NotificationType = "error" | "warning" | "success" | "info";

/**
 * [Function] 알림 생성
 * @param type 알림 유형
 * @param title 알림 제목
 * @param message 알림 메시지
 */
export const createNotification = (type: NotificationType, title: string, message?: React.ReactNode): void => {
  notification[type]({
    message: title,
    description: message,
    duration: 1.4
  });
}