

export  function
  MakeDateCompatibleWithInput(date:string|Date) {
    const cDate = new Date(date);
    return cDate.toISOString().substring(0,10);
  }



