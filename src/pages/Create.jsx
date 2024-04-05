import ImageUploadInput from "@/components/ImageUploade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/features/userDetailSlice";
import { Send } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserData = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: name === "age" ? parseInt(value) : value,
    });
  };

  const handleSubmit = () => {
    console.log("userData...", userData);
    dispatch(createUser(userData));
    navigate("/");
  };

  return (
    <div className="px-72 py-20 space-y-8">
      <div className="scroll-m-20 flex items-center justify-between border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Create User
        <Button onClick={handleSubmit}>
          <Send className="mr-2 h-4 w-4" />
          Submit
        </Button>
      </div>
      <div>
        <div className="grid px-4 mb-6 grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="Enter First Name"
              onChange={getUserData}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Enter Last Name"
              onChange={getUserData}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="age">Age</Label>
            <Input
              type="number"
              id="age"
              name="age"
              placeholder="Enter Age"
              onChange={getUserData}
            />
          </div>
        </div>
        <ImageUploadInput
          onUpdate={(files) =>
            setUserData((prevData) => ({
              ...prevData,
              photo: files.map((x) => x.fileUrl).join("\n"),
            }))
          }
        />
      </div>
    </div>
  );
};

export default Create;
