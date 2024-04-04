import { CreateUserDialog } from "@/components/CreateUserDialog";
import { Button } from "@/components/ui/button";
import { UserListTable } from "@/components/UsetListTable";

import { UserRoundPlus } from "lucide-react";

const App = () => {
  return (
    <div className="px-72 py-20 space-y-8">
      <div className="scroll-m-20 flex items-center justify-between border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        List of Users
        <CreateUserDialog
          action="create"
          triggerComponent={
            <Button>
              <UserRoundPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          }
        />
      </div>
      <UserListTable />
    </div>
  );
};

export default App;
