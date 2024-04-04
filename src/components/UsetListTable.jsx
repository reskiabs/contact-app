import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilLine, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailSlice";
import { CreateUserDialog } from "./CreateUserDialog";
import { Button } from "./ui/button";

export function UserListTable() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.app);
  console.log("🚀 ~ UserListTable ~ users:", users.data);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="rounded-xl overflow-hidden border">
      <Table>
        <TableHeader className="bg-neutral-100">
          <TableRow>
            <TableHead className="w-[70px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data?.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src={user.photo} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell className="text-right flex md:items-center md:justify-end gap-x-2 md:gap-x-4">
                <CreateUserDialog
                  id={user.id}
                  action="update"
                  triggerComponent={
                    <Button variant="outline">
                      <PencilLine className="w-4 h-4 mr-2" />
                      Update
                    </Button>
                  }
                />
                <Button
                  type="button"
                  onClick={() => dispatch(deleteUser(user.id))}
                  variant="destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
