import UserStats from "@/components/user/user-stats";
import React from "react";
import { TUserAccountDetails } from "services/typings/user";

type Props = {
  data: TUserAccountDetails;
};

const UserContainer = (props: Props) => {
  return (
    <div>
      <UserStats {...props.data} />
    </div>
  );
};

export default UserContainer;
