import React, { useEffect, useState } from "react";
import { paginate } from "../../../untils/paginate";
import GroupList from "../../common/groupList";
import API from "../../../API";
import SearchStatus from "../../ui/searchStatus";

import _, { forEach } from "lodash";
import { useHistory, useParams } from "react-router-dom";

import Pagination from "../../common/pagination";
import User from "../userPage";
import UserTable from "../../ui/usersTable";
import ChangeUser from "../../layouts/changeUser";
const Users = () => {
  const pageSize = 8;
  const [currrentProf, setCurrrentProf] = useState();
  const [professions, setProfessions] = useState();
  const [currerntPage, setCurrerntPage] = useState(1);
  const params = useParams();
  const { usersId } = params;
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  const {change} = params
  const [users, setUsers] = useState(API.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const handlePageChange = (pageIndex) => {
    setCurrerntPage(pageIndex);
  };

  useEffect(() => {
    setCurrerntPage(1);
  }, [currrentProf, searchQuery]);

  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const clearFilter = () => {
    setCurrrentProf();
  };
  const handleSearchQuery = ({ target }) => {
    setCurrrentProf();
    setSearchQuery(target.value);
  };

  const handleItemSelect = (item) => {
    setSearchQuery("");
    setCurrrentProf(item.name);
  };

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter(
          (user) =>
            user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : currrentProf
      ? users.filter((user) => user.profession.name === currrentProf)
      : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currerntPage, pageSize);

    const handleSort = (item) => {
      setSortBy(item);
    };
    return (
      <>
      {
        change?<ChangeUser users={users} usersId={usersId}/>:(usersId ? (
          <User users={users} usersId={usersId} />
        ) : (
          <div className="d-flex">
            {professions && (
              <div className="d-flex flex-column flex-shrink-0 p-3">
                <GroupList
                  items={professions}
                  onItemSelect={handleItemSelect}
                  currrentProf={currrentProf}
                />
                <button
                  className="btn btn-secondary mt-2"
                  onClick={clearFilter}
                >
                  Очистить
                </button>
              </div>
            )}
            <div className="d-flex flex-column">
              <SearchStatus length={count} />
              <input
                type="text"
                className="form-control"
                placeholder="Найти пользователя..."
                aria-label="Найти пользователя"
                aria-describedby="button-addon2"
                onChange={handleSearchQuery}
                value={searchQuery}
              />
              {count > 0 && (
                <UserTable
                  users={userCrop}
                  onSort={handleSort}
                  selectedSort={sortBy}
                  onDelete={handleDelete}
                  onToggleBookMark={handleToggleBookMark}
                />
              )}
              <div className="d-flex justify-content-center">
                <Pagination
                  itemsCount={count}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                  currerntPage={currerntPage}
                />
              </div>
            </div>
          </div>
        ))
      }
        
      </>
    );
  }
  return "Loading...";
};
export default Users;
