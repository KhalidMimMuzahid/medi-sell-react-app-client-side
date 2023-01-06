import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../contexts/MyProvider/MyProvider";

const useRole = () => {
  const { currentUser } = useContext(MyContext);
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  useEffect(() => {
    if (currentUser && currentUser?.email) {
      fetch(`http://localhost:5000/checkrole?email=${currentUser?.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data?.role) {
            setRole(data.role);
            setIsRoleLoading(false);
          } else {
            setRole(null);
            setIsRoleLoading(false);
          }
        });
    }
  }, [currentUser]);

  return { role, isRoleLoading };
};

export default useRole;
