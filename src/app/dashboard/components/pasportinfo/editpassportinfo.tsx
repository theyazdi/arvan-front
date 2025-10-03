import { AddPassportInfo } from "./addpassportinfo";

interface EditPassportInfoProps {
  token: string;
  getData: () => void;
  id: number;
}

function EditPassportInfo({ token, getData, id }: EditPassportInfoProps) {
  return (
    <div>
      <AddPassportInfo mode="edit" getData={getData} token={token} id={id} />
    </div>
  );
}

export { EditPassportInfo };
