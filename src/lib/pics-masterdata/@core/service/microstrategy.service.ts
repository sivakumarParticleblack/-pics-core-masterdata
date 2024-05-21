import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { DataStoreService } from './data-store.service';
import { PermissionStore } from './../permissions/permission.store';

declare const microstrategy: any;

@Injectable({
  providedIn: 'root'
})
export class MicrostrategyService {
  dossierList: any;
  RBACORG: any;
  environment: any;
  constructor(private http: HttpClient,
    private alertService: AlertService,
    private permissionStore: PermissionStore,
    private _storeservice: DataStoreService) {
      this._storeservice.currentStore.subscribe((res: any) => {
          if (res['RBACORG'] && res['RBACORG'] !== '') {
          this.RBACORG = res['RBACORG'];
          this.environment = this.RBACORG['environment'] ? this.RBACORG['environment'] : '';
        }
      });
    }

  getAuthToken() {
    const body = {
      username: this.environment.mstrUsername,
      password: this.environment.mstrPassword,
      loginMode: 1
    };
    return this.http.post(`${this.environment.mstrURL}/api/auth/login`, body, {
      withCredentials: true,
      headers: { 'Content-type': 'application/json' },
      observe: 'response'
    });
  }

  getDossier(projectId?: string, dossierId?: string, pageNo?: string) {
    const permissions = this.permissionStore.state;
    const projectUrl = `${this.environment.mstrURL}/app/${projectId}`;
    const dossierUrl = `${projectUrl}/${dossierId}/${pageNo}`;
     microstrategy.dossier
      .create({
        placeholder: document.getElementById('dossierContainer'),
        url: dossierUrl,
        navigationBar: {
          enabled: true,
          gotoLibrary: permissions?.ANA_LIBRARY,
          title: true,
          toc: true,
          reset: true,
          reprompt: true,
          share: true,
          comment: true,
          notification: true,
          filter: true,
          options: true,
          search: true,
          bookmark: true
        },
        enableCustomAuthentication: true,
        enableResponsive: false,
        containerWidth: 400,
        containerHeight: 400,
        customAuthenticationType: microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN,
        getLoginToken: async () => {
          const response = await this.getAuthToken().toPromise();
          return response.headers.get('x-mstr-authtoken');
        }
      })
      .catch((_err: any) => this.alertService.error(`Failed to connect ${this.environment.mstrURL}`));
  }

  async getLibraryDetails() {
    const token = await this.getAuthToken().toPromise();
    const authtoken = token.headers.get('x-mstr-authtoken')
    const headerInfo = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-MSTR-AuthToken': authtoken ? authtoken: '',
      'X-MSTR-ProjectID': this.environment.mstrProjectID
    };
    return this.http
      .get(`${this.environment.mstrURL}/api/library`, {
        withCredentials: true,
        headers: headerInfo
      })
      .toPromise()
      .then((response: any) => {
        return response.map((mstr: any) => ({
          id: mstr.target.id,
          projectId: mstr.projectId,
          name: mstr.target.name
        }));
      });
  }
}
