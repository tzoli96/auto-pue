import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useDomainActions } from '../hooks/useDomainActions';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
    domain_url: z.string().min(2, "Invalid URL format"),
    domain_type: z.string().min(2, "Domain type must be at least 2 characters."),
    is_webshop: z.boolean(),
    phoneNumbers: z.record(z.string().min(1, "Phone number is required")),
    emailAddresses: z.record(z.string().email("Invalid email format")),
    companyNames: z.record(z.string().min(2, "Company name must be at least 2 characters.")),
});

export default function SingleEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { handleGetDomainById, handleUpdateDomain } = useDomainActions();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            domain_url: "",
            domain_type: "",
            is_webshop: false,
            phoneNumbers: {},
            emailAddresses: {},
            companyNames: {},
        },
    });

    useEffect(() => {
        if (id) {
            handleGetDomainById(id).then(domainData => {
                if (domainData) {
                    form.reset({
                        domain_url: domainData.domain_url,
                        domain_type: domainData.domain_type,
                        is_webshop: domainData.attributes.is_webshop === "1",
                        phoneNumbers: domainData.attributes.phoneNumbers || {},
                        emailAddresses: domainData.attributes.emailAddresses || {},
                        companyNames: domainData.attributes.companyNames || {},
                    });
                }
            });
        }
    }, [id, handleGetDomainById, form]);

    const handleFieldChange = (fieldName: keyof z.infer<typeof FormSchema>, key: string, value: string) => {
        const currentField = form.getValues()[fieldName];
        form.setValue(fieldName, {
            ...currentField,
            [key]: value,
        });
    };

    const handleAddField = (fieldName: keyof z.infer<typeof FormSchema>, prefix: string) => {
        const currentField = form.getValues()[fieldName];
        const newKey = `${prefix}_${Object.keys(currentField).length + 1}`;
        form.setValue(fieldName, {
            ...currentField,
            [newKey]: "",
        });
    };

    const handleRemoveField = (fieldName: keyof z.infer<typeof FormSchema>, key: string) => {
        const currentField = form.getValues()[fieldName];
        const updatedField = { ...currentField };
        delete updatedField[key];
        form.setValue(fieldName, updatedField);
    };

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (id) {
            handleUpdateDomain(id, {
                domain_url: data.domain_url,
                domain_type: data.domain_type,
                attributes: {
                    is_webshop: data.is_webshop ? "1" : "0",
                    phoneNumbers: data.phoneNumbers,
                    emailAddresses: data.emailAddresses,
                    companyNames: data.companyNames,
                }
            }).then(() => {
                toast({
                    title: "Domain updated successfully!",
                    status: "success",
                });
            }).catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Update failed",
                    description: error.message,
                    status: "error",
                });
            });
        }
    }

    return (
        <Layout>
            <h2 className="text-2xl font-bold mb-4">Edit Domain</h2>
            <Button onClick={() => navigate('/dashboard')} variant="outline" className="mb-4">
                Back to Dashboard
            </Button>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="domain_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Domain URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="example.com" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the domain's URL.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="domain_type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Domain Type</FormLabel>
                                <FormControl>
                                    <Input placeholder="Personal/Business" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the type of the domain.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="is_webshop"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Is Webshop</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormDescription>
                                    Is this domain a webshop?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumbers"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Phone Numbers
                                    <Button variant="outline" size="sm" className="ml-2" onClick={() => handleAddField("phoneNumbers", "phone")}>
                                        Add Phone Number
                                    </Button>
                                </FormLabel>
                                {Object.entries(field.value).map(([key, value]) => (
                                    <div key={key} className="flex items-center space-x-2">
                                        <FormControl>
                                            <Input
                                                placeholder="Phone Number"
                                                value={value}
                                                onChange={(e) => handleFieldChange("phoneNumbers", key, e.target.value)}
                                            />
                                        </FormControl>
                                        <Button variant="destructive" size="sm" onClick={() => handleRemoveField("phoneNumbers", key)}>
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="emailAddresses"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email Addresses
                                    <Button variant="outline" size="sm" className="ml-2" onClick={() => handleAddField("emailAddresses", "email")}>
                                        Add Email Address
                                    </Button>
                                </FormLabel>
                                {Object.entries(field.value).map(([key, value]) => (
                                    <div key={key} className="flex items-center space-x-2">
                                        <FormControl>
                                            <Input
                                                placeholder="Email Address"
                                                value={value}
                                                onChange={(e) => handleFieldChange("emailAddresses", key, e.target.value)}
                                            />
                                        </FormControl>
                                        <Button variant="destructive" size="sm" onClick={() => handleRemoveField("emailAddresses", key)}>
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="companyNames"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Company Names
                                    <Button variant="outline" size="sm" className="ml-2" onClick={() => handleAddField("companyNames", "company")}>
                                        Add Company Name
                                    </Button>
                                </FormLabel>
                                {Object.entries(field.value).map(([key, value]) => (
                                    <div key={key} className="flex items-center space-x-2">
                                        <FormControl>
                                            <Input
                                                placeholder="Company Name"
                                                value={value}
                                                onChange={(e) => handleFieldChange("companyNames", key, e.target.value)}
                                            />
                                        </FormControl>
                                        <Button variant="destructive" size="sm" onClick={() => handleRemoveField("companyNames", key)}>
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </Layout>
    )
}
