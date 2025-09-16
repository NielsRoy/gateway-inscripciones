import { PaginationDto } from "../dto/pagination.dto";

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
}

export interface ProcessorPayload {
  method: HttpMethod;
  entity: any;
  body?: any;
  hash: string;
  paginationDto?: PaginationDto;
  //async: boolean;
  replyTo: string;
}

