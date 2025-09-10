"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Category } from "@/payload-types";
import { use, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({
    open,
    onOpenChange
}: Props) => {

    const trpc = useTRPC();
    const { data } = useQuery(trpc.categories.getMany.queryOptions());

    const router = useRouter();

    const [parentCategories, setParentCategories] = useState<Category[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    // if we have parent categories, show those, otherwise show root categories

    const currentCategories = parentCategories ?? data ?? [];
    const handleOpenChange = (open: boolean) => {
        setSelectedCategory(null);
        setParentCategories(null);
        onOpenChange(open);
    }
    const handleCategoryClick = (category: Category) => {
        const subcats = category.subcategories?.docs ?? [];
        if(subcats.length > 0) {
            setParentCategories(subcats as Category[]);
            setSelectedCategory(category);
        } else {
            // This is a leaf category (no subcategories)
            if(parentCategories && selectedCategory){
                //this is a subcategory - navigate to /category/subcategory
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            } else {
                //this is a main category-navigate to /category
                if(category.slug === "all"){
                    router.push("/");
                } else {
                    router.push(`/${category.slug}`);
                }
            }
            handleOpenChange(false);       
        }
    }

    const handleBackClick = () => {
        if(parentCategories){
            setSelectedCategory(null);
            setSelectedCategory(null);
        }
    }

    const backgroundColor = selectedCategory?.color || "white";

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{ backgroundColor }}
            >
                <SheetHeader className="p-4 border-b ">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategories && (
                        <button
                            onClick={handleBackClick}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                        >
                            <ChevronLeftIcon className="size-4 mr-2" />
                            Back
                        </button>
                    )}
                    {currentCategories?.map((category: Category) => (
                        <button
                            key={category.slug}
                            onClick={() => handleCategoryClick(category)}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium"
                        >
                            {category.name}
                            {/*CAUTION: Removed length of subcategories > 0*/}
                            {category.subcategories && Array.isArray(category.subcategories) &&
                                category.subcategories.length > 0 && (
                                <ChevronRightIcon className="size-4" />
                            )}
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};