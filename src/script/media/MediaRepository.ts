/*
 * Wire
 * Copyright (C) 2018 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

import {MediaConstraintsHandler} from './MediaConstraintsHandler';
import {MediaDevicesHandler} from './MediaDevicesHandler';
import {MediaStreamHandler} from './MediaStreamHandler';

import type {PermissionRepository} from '../permission/PermissionRepository';

export class MediaRepository {
  public constraintsHandler: MediaConstraintsHandler;
  public devicesHandler: MediaDevicesHandler;
  public streamHandler: MediaStreamHandler;

  constructor(permissionRepository: PermissionRepository) {
    this.devicesHandler = new MediaDevicesHandler();
    this.constraintsHandler = new MediaConstraintsHandler(this.devicesHandler.currentAvailableDeviceId);
    this.streamHandler = new MediaStreamHandler(this.constraintsHandler, permissionRepository);
    this.devicesHandler.getMediaDeviceAccessStream = (withVideo: boolean): Promise<MediaStream | void> => {
      return this.streamHandler.requestMediaSreamAccess(withVideo);
    };
  }
}
