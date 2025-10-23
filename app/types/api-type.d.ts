/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

interface ConfigMenuCreateRequest {
  /** @format int32 */
  Seq?: number;
  Header?: string | null;
  Children?: MenuChildren[] | null;
  CreateBy?: string | null;
}

interface ConfigMenuDeleteRequest {
  Id?: string | null;
}

interface ConfigMenuGetAllRequest {
  CurrentRole?: string | null;
}

interface ConfigMenuGetAllResponse {
  /** @format int32 */
  Seq?: number;
  Header?: string | null;
  Children?: MenuChildren[] | null;
}

interface ConfigMenuInquiryRequest {
  /** @format int32 */
  itemsPerPage?: number;
  /** @format int32 */
  page?: number;
  SortByKey?: string | null;
  OrderBy?: string | null;
  /** @format int32 */
  Skip?: number;
  /** @format int32 */
  Limit?: number;
  Header?: string | null;
}

interface ConfigMenuInquiryResponse {
  Id?: string | null;
  /** @format int32 */
  Seq?: number;
  Header?: string | null;
  Children?: MenuChildren[] | null;
  /** @format date-time */
  CreateDate?: Date | null;
  CreateBy?: string | null;
  /** @format date-time */
  UpdateDate?: Date | null;
  UpdateBy?: string | null;
}

interface ConfigMenuInquiryResponseDataTableResponse {
  /** @format int32 */
  Total?: number;
  Datas?: ConfigMenuInquiryResponse[] | null;
}

interface ConfigMenuUpdateRequest {
  Id?: string | null;
  /** @format int32 */
  Seq?: number;
  Header?: string | null;
  Children?: MenuChildren[] | null;
  UpdateBy?: string | null;
}

interface ConfigPermissionCreateRequest {
  Role?: string | null;
  Permissions?: Permissions;
  CreateBy?: string | null;
}

interface ConfigPermissionDeleteRequest {
  Id?: string | null;
}

interface ConfigPermissionInquiryRequest {
  /** @format int32 */
  itemsPerPage?: number;
  /** @format int32 */
  page?: number;
  SortByKey?: string | null;
  OrderBy?: string | null;
  /** @format int32 */
  Skip?: number;
  /** @format int32 */
  Limit?: number;
  Role?: string | null;
}

interface ConfigPermissionInquiryResponse {
  Id?: string | null;
  Role?: string | null;
  Permissions?: Permissions;
  /** @format date-time */
  CreateDate?: Date | null;
  CreateBy?: string | null;
  /** @format date-time */
  UpdateDate?: Date | null;
  UpdateBy?: string | null;
}

interface ConfigPermissionInquiryResponseDataTableResponse {
  /** @format int32 */
  Total?: number;
  Datas?: ConfigPermissionInquiryResponse[] | null;
}

interface ConfigPermissionUpdateRequest {
  Id?: string | null;
  Role?: string | null;
  Permissions?: Permissions;
  UpdateBy?: string | null;
}

interface MasterLookupCreateRequest {
  Name?: string | null;
  Options?: string[] | null;
  CreateBy?: string | null;
}

interface MasterLookupDeleteRequest {
  Id?: string | null;
}

interface MasterLookupInquiryRequest {
  /** @format int32 */
  itemsPerPage?: number;
  /** @format int32 */
  page?: number;
  SortByKey?: string | null;
  OrderBy?: string | null;
  /** @format int32 */
  Skip?: number;
  /** @format int32 */
  Limit?: number;
  Name?: string | null;
}

interface MasterLookupInquiryResponse {
  Id?: string | null;
  Name?: string | null;
  Options?: string[] | null;
  /** @format date-time */
  CreateDate?: Date | null;
  CreateBy?: string | null;
  UpdateBy?: string | null;
  /** @format date-time */
  UpdateDate?: Date | null;
}

interface MasterLookupInquiryResponseDataTableResponse {
  /** @format int32 */
  Total?: number;
  Datas?: MasterLookupInquiryResponse[] | null;
}

interface MasterLookupUpdateRequest {
  Id?: string | null;
  Name?: string | null;
  Options?: string[] | null;
  UpdateBy?: string | null;
}

interface MasterSystemCreateRequest {
  Code?: string | null;
  Name?: string | null;
  CreateBy?: string | null;
}

interface MasterSystemDeleteRequest {
  Id?: string | null;
  Code?: string | null;
  Name?: string | null;
}

interface MasterSystemInquiryRequest {
  /** @format int32 */
  itemsPerPage?: number;
  /** @format int32 */
  page?: number;
  SortByKey?: string | null;
  OrderBy?: string | null;
  /** @format int32 */
  Skip?: number;
  /** @format int32 */
  Limit?: number;
  Name?: string | null;
}

interface MasterSystemInquiryResponse {
  Id?: string | null;
  Code?: string | null;
  Name?: string | null;
  CreateBy?: string | null;
  UpdateBy?: string | null;
  /** @format date-time */
  CreateDate?: Date | null;
  /** @format date-time */
  UpdateDate?: Date | null;
}

interface MasterSystemInquiryResponseDataTableResponse {
  /** @format int32 */
  Total?: number;
  Datas?: MasterSystemInquiryResponse[] | null;
}

interface MasterSystemUpdateRequest {
  Id?: string | null;
  Code?: string | null;
  Name?: string | null;
  UpdateBy?: string | null;
}

interface MasterTemplateCreateRequest {
  Id?: string | null;
  SystemId?: string | null;
  TemplateName?: string | null;
  EventName?: string | null;
  TemplateMessage?: string | null;
  CreateBy?: string | null;
  TemplateTypes?: TemplateType[] | null;
}

interface MasterTemplateDeleteRequest {
  Id?: string | null;
  SystemId?: string | null;
  Name?: string | null;
  TemplateMessage?: string | null;
}

interface MasterTemplateDuplicateRequest {
  TemplateId?: string | null;
  SystemId?: string | null;
  AdUser?: string | null;
}

interface MasterTemplateGetAllRequest {
  SystemId?: string | null;
}

interface MasterTemplateGetAllResponse {
  Id?: string | null;
  SystemId?: string | null;
  IsActive?: boolean;
  TemplateName?: string | null;
  EventName?: string | null;
  TemplateMessage?: string | null;
  /** @format date-time */
  CreateDate?: Date | null;
  CreateBy?: string | null;
  /** @format date-time */
  UpdateDate?: Date | null;
  UpdateBy?: string | null;
  TemplateTypes?: TemplateType[] | null;
}

interface MasterTemplateInquiryRequest {
  /** @format int32 */
  itemsPerPage?: number;
  /** @format int32 */
  page?: number;
  SortByKey?: string | null;
  OrderBy?: string | null;
  /** @format int32 */
  Skip?: number;
  /** @format int32 */
  Limit?: number;
  SystemId?: string | null;
  TemplateName?: string | null;
}

interface MasterTemplateInquiryResponse {
  Id?: string | null;
  SystemId?: string | null;
  IsActive?: boolean;
  TemplateName?: string | null;
  EventName?: string | null;
  TemplateMessage?: string | null;
  /** @format date-time */
  CreateDate?: Date | null;
  CreateBy?: string | null;
  /** @format date-time */
  UpdateDate?: Date | null;
  UpdateBy?: string | null;
  TemplateTypes?: TemplateType[] | null;
}

interface MasterTemplateInquiryResponseDataTableResponse {
  /** @format int32 */
  Total?: number;
  Datas?: MasterTemplateInquiryResponse[] | null;
}

interface MasterTemplateUpdateRequest {
  Id?: string | null;
  SystemId?: string | null;
  TemplateName?: string | null;
  EventName?: string | null;
  TemplateMessage?: string | null;
  UpdateBy?: string | null;
  TemplateTypes?: TemplateType[] | null;
}

interface MenuChildren {
  Label?: string | null;
  Icon?: string | null;
  To?: string | null;
  Roles?: string[] | null;
}

interface Permissions {
  btnTemplateAddDisable?: boolean;
  btnTemplateEditDisable?: boolean;
  btnTemplateDeleteDisable?: boolean;
}

interface SmsHistoryExportRequest {
  TemplateName?: string | null;
  SystemName?: string | null;
  /** @format date-time */
  SendDateStart?: Date | null;
  /** @format date-time */
  SendDateEnd?: Date | null;
  Status?: string | null;
  Tel?: string | null;
  EventName?: string | null;
  Remark?: string | null;
}

interface SmsHistoryExportResponse {
  Id?: string | null;
  TrackNo?: string | null;
  TemplateName?: string | null;
  SystemName?: string | null;
  Tel?: string | null;
  /** @format date-time */
  CreateDate?: Date | null;
  /** @format date-time */
  SendDate?: Date | null;
  Message?: string | null;
  EventName?: string | null;
  Remark?: string | null;
  SendBy?: string | null;
  UploadBy?: string | null;
  Status?: string | null;
  /** @format int32 */
  Code?: number | null;
  SmsId?: string | null;
  IsInvalid?: boolean;
}

interface SmsHistoryInquiryRequest {
  /** @format int32 */
  itemsPerPage?: number;
  /** @format int32 */
  page?: number;
  SortByKey?: string | null;
  OrderBy?: string | null;
  /** @format int32 */
  Skip?: number;
  /** @format int32 */
  Limit?: number;
  TemplateName?: string | null;
  SystemName?: string | null;
  /** @format date-time */
  SendDateStart?: Date | null;
  /** @format date-time */
  SendDateEnd?: Date | null;
  Status?: string | null;
  EventName?: string | null;
  Remark?: string | null;
  Tel?: string | null;
}

interface SmsHistoryInquiryResponse {
  Id?: string | null;
  TrackNo?: string | null;
  TemplateName?: string | null;
  SystemName?: string | null;
  Tel?: string | null;
  /** @format date-time */
  CreateDate?: Date | null;
  /** @format date-time */
  SendDate?: Date | null;
  Message?: string | null;
  EventName?: string | null;
  Remark?: string | null;
  SendBy?: string | null;
  UploadBy?: string | null;
  Status?: string | null;
  /** @format int32 */
  Code?: number | null;
  SmsId?: string | null;
  IsInvalid?: boolean;
}

interface SmsHistoryInquiryResponseDataTableResponse {
  /** @format int32 */
  Total?: number;
  Datas?: SmsHistoryInquiryResponse[] | null;
}

interface SmsInquiryRequest {
  /** @format int32 */
  itemsPerPage?: number;
  /** @format int32 */
  page?: number;
  SortByKey?: string | null;
  OrderBy?: string | null;
  /** @format int32 */
  Skip?: number;
  /** @format int32 */
  Limit?: number;
  TrackNo?: string | null;
  UploadBy?: string | null;
  IsInvalid?: boolean;
}

interface SmsInquiryResponse {
  Id?: string | null;
  TrackNo?: string | null;
  TemplateName?: string | null;
  SystemName?: string | null;
  Tel?: string | null;
  /** @format date-time */
  CreateDate?: Date | null;
  /** @format date-time */
  SendDate?: Date | null;
  Message?: string | null;
  EventName?: string | null;
  Remark?: string | null;
  SendBy?: string | null;
  UploadBy?: string | null;
  Status?: string | null;
  /** @format int32 */
  Code?: number | null;
  SmsId?: string | null;
  IsInvalid?: boolean;
}

interface SmsInquiryResponseDataTableResponse {
  /** @format int32 */
  Total?: number;
  Datas?: SmsInquiryResponse[] | null;
}

interface SmsSendByTrackRequest {
  SendBy?: string | null;
  TrackNo?: string | null;
}

interface SmsSendRequest {
  SystemId?: string | null;
  TemplateId?: string | null;
  SystemName?: string | null;
  TemplateName?: string | null;
  Tel?: string | null;
  Message?: string | null;
  PreviewMessage?: string | null;
  EventName?: string | null;
  Remark?: string | null;
  SendBy?: string | null;
}

interface SmsSendResponse {
  Status?: string | null;
  detail?: string | null;
  /** @format int32 */
  Code?: number | null;
}

interface SmsTrackInquiryRequest {
  TrackNo?: string | null;
}

interface TemplateType {
  Key?: string | null;
  Type?: string | null;
  Value?: string | null;
  DefaultValue?: string | null;
  Label?: string | null;
}
