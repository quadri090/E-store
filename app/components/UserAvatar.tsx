import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface UserAvatarProps {
  src?: string | null | undefined;
}
const UserAvatar = ({ src }: UserAvatarProps) => {
  if (src) {
    return <Image src={src} alt="Avatar" height={30} width={30} className="" />;
  }
  return <FaUserCircle size={24} />;
};

export default UserAvatar;
