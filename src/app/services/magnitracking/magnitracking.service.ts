import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MagnitrackingService {

  constructor(
    private http: HttpClient
  ) { }

  gpsMagnitracking(id: any) {
    return this.http.get(
      'https://www.magnitracking.net/api/api.php?api=user&ver=1.0&key=3825AD92B3D1A5BA03B725D02E90EB1A&cmd=OBJECT_GET_LOCATIONS,' + id
    );
  }

  gpsMapUser() {
    return this.http.get(
      'https://www.magnitracking.net/api/api.php?api=user&ver=1.0&key=3825AD92B3D1A5BA03B725D02E90EB1A&cmd=USER_GET_OBJECTS'
    );
  }

  gpsMagUserId(id: any) {
    return this.http.get(
      'https://www.magnitracking.net/api/api.php?api=user&ver=1.0&key=3825AD92B3D1A5BA03B725D02E90EB1A&cmd=USER_GET_OBJECTS,' + id
    );
  }

}
