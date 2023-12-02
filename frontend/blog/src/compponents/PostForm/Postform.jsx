import React, { useCallback, useState,useId } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
function Postform({ post ,content,title ,slug ,status}) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    
    console.log("content is "+ content)
    const [formdata,setformdata]=useState("");
    const navigate = useNavigate();
    const userData = useSelector((state) => state.users.userData);
    const id=useId();
    const submit = async (data) => {
        setformdata(data);
        console.log("data is "+JSON.stringify(formdata));
        console.log((data.image[0].name))
        
        // if (post) {
        //     const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

        //     if (file) {
        //         appwriteService.deleteFile(post.featuredImage);
        //     }

        //     const dbPost = await appwriteService.updatePost(post.$id, {
        //         ...data,
        //         featuredImage: file ? file.$id : undefined,
        //     });

        //     if (dbPost) {
        //         navigate(`/post/${dbPost.$id}`);
        //     }
        // } else {
        //     const file = await appwriteService.uploadFile(data.image[0]);

        //     if (file) {
        //         const fileId = file.$id;
        //         data.featuredImage = fileId;
        //         const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

        //         if (dbPost) {
        //             navigate(`/post/${dbPost.$id}`);
        //         }
        //     }
        // }
        const response=await axios.post("http://localhost:6060/createPost",{
            image:data.image[0].name,
            content:data.content,
            title:data.title,
            status:data.status,
            userid:id,
            slug:data.slug,
            update:content?"yes":"no"

        }).then((success)=>{
            return success;
        })
        console.log("message is "+ response.data.message);
        if(response.data.message){
            navigate("/")
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                    title={title}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    slug={slug}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={content} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    // accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: true })}
                />
                
                { true && (
                    <div className="w-full mb-4">
                         {/* add image from backend in src */}
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/6/60/OpenEuphoria_mascot_200px.png"
                            alt="hello"
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                    status1={status==="true"?"active":"inactive"}

                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
                {
                    slug ? <Button  slug={slug}type="submit" bgColor={post ? "bg-red-500" : undefined} className="w-full mt-5 bg-red-500">
                                Delete
                    </Button>:null
                }
            </div>
        </form>
    );
}
export default Postform;
//type="submit" bgColor={post ? "bg-red-500" : undefined} className="w-full"