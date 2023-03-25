export class MainResponse<T>{
  code !: number;
  data !: T;
}

export class JsonResult {
  code!: number;
  data: any;
}

export class JsonResultFireBase {
  status!: string;
  msg!: string;
  Data!: any;
}