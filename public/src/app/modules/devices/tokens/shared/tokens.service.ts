import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../../../message.service';
import { CommonsService } from '../../../../common/shared/commons.service';
import {default as config} from '../../config/config.json';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TokensService extends CommonsService {

  constructor(http: HttpClient,
    messageService: MessageService) 
  { 
    super(http, messageService);
    this.url = (environment.appConfig.url + config["tokens"].component.urlRelative).toLowerCase() ;
    this.moduleName = config['tokens'].component.nameModule;
    this.createRemoteEvents();
  } 
}
