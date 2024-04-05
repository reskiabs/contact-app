import { Button } from "@/components/ui/button";
import { UserListTable } from "@/components/UsetListTable";
import { UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create");
  };
  return (
    <div className="px-72 py-20 space-y-8">
      <div className="scroll-m-20 flex items-center justify-between border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        List of Users
        <Button onClick={handleClick}>
          <UserRoundPlus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </div>
      <UserListTable />
    </div>
  );
};

export default Home;
