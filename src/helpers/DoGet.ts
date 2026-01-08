//TODO: improve or rename to DoGet

export async function DoGet(
  address: string,
  retries: number,
  setter: (arg: any) => void,
  errorPrefix?: string
) {
  return fetch(address)
    .then((result) => {
      if (result && result.ok) {
        return result.json();
      }
      console.log("got null");
      if (retries <= 0) {
        return;
      }
      console.log(address, ". Retries left: ", retries);
      retries -= 1;
    })
    .then((json) => {
      if (json == null) {
        return;
      }
      let jsonContent = json;
      if (json["content"] != null) {
        jsonContent = json.content;
      }
      setter(jsonContent);
      return json;
    })
    .catch((error) => {
      errorPrefix = errorPrefix || "";
      console.log(errorPrefix + error);
    });
}
