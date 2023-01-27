export const convertDate=(date: string): string=> {
    let dt= new Date(date).toLocaleString('en-GB').substring(0,10);
    return dt;
  }