import React from "react";
import { TUserAccountDetails } from "services/typings/user";

type Props = Omit<TUserAccountDetails, "_id">;

const UserStats = ({}: Props) => {
  return <div>UserStats</div>;
};

export default UserStats;
