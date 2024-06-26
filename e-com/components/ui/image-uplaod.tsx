"use client";

import React, {useEffect, useState} from "react";
import {Button} from "./button";
import {ImagePlus, Trash} from "lucide-react";
import Image from "next/image";
import {CldUploadWidget} from "next-cloudinary";

interface imageUploadProps {
  disabled?: boolean;
  onchange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUplaod: React.FC<imageUploadProps> = ({
  disabled,
  onchange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onchange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="bnsobvds">
        {({open}) => {
            const onclick=()=>{
                open()
            }
          return <Button type="button" disabled={disabled}  variant="secondary" onClick={onclick}><ImagePlus className="h-4 w-4 mr-2"/>Upload Image</Button>;
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUplaod;
