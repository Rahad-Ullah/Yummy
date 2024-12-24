/* eslint-disable import/order */
"use client";

import { Button } from "@nextui-org/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";

import YMForm from "@/src/components/form/YMForm";
import YMInput from "@/src/components/form/YMInput";

import { Building2, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Container from "@/src/components/UI/Container";
import { contactValidationSchema } from "@/src/schemas/contact.schema";
import { toast } from "sonner";
import { Textarea } from "@nextui-org/input";

const ContactPage = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    toast.success("Successfully submitted");
  };

  return (
    <div className="py-8 md:py-12">
      <Container>
        {/* form section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
          {/* background image */}
          <div className="">
            <Image
              alt="sport image"
              className="rounded-lg w-full h-full object-cover"
              height={500}
              src="https://www.allrecipes.com/thmb/-6zeD4JCQcOhNzcq6lGog3ByMRc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/70801_BrickOvenPizzaBrooklynStyle_ddmfs_3x4_3852-2ef5d5e09aa6401d8041dc0a32c8aa27.jpg"
              width={650}
            />
          </div>

          {/* contact form */}
          <div>
            <div className="space-y-2 mb-6">
              <h1 className="text-2xl md:text-3xl font-extrabold">
                Let&apos;s Get In Touch.
              </h1>
              <p className="font-medium">
                Or just reach out manually to{" "}
                <span className="text-primary dark:text-primary-400">
                  hello@yummy.com
                </span>
              </p>
            </div>

            <YMForm
              resolver={zodResolver(contactValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="py-3">
                <YMInput label="Name" name="name" type="text" />
              </div>
              <div className="py-3">
                <YMInput label="Email" name="email" type="email" />
              </div>
              <div className="py-3">
                <YMInput label="Subject" name="subject" type="text" />
              </div>
              <div className="py-3">
                <Textarea label="Message" variant="bordered" />
              </div>
              <Button
                className="mt-3 w-full rounded-md bg-default-900 font-semibold text-default"
                type="submit"
              >
                Submit
              </Button>
            </YMForm>
          </div>
        </div>

        {/* contact information section */}
        <div className="pt-14 md:pt-20 grid gap-10">
          <div className="font-medium space-y-3">
            <span className="text-sm font-semibold border rounded-full px-3 py-1">
              Reach Out To Us
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold pt-2">
              We&apos;d Love To Hear From You
            </h1>
            <p className="font-medium">
              Or just reach out manually to{" "}
              <span className="text-primary dark:text-primary-400">
                hello@yummy.com
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <span className="inline-flex p-2 mb-3 bg-indigo-50 rounded-full text-primary dark:text-primary-400">
                <Mail size={20} />
              </span>
              <h3 className="text-lg font-bold">Email Support</h3>
              <p className="text-sm">Our team can respond in real time.</p>
              <p className="mt-3 text-primary dark:text-primary-400 font-bold">
                hello@yummy.com
              </p>
            </div>
            <div className="p-4">
              <span className="inline-flex p-2 mb-3 bg-indigo-50 rounded-full text-primary dark:text-primary-400">
                <Building2 size={20} />
              </span>
              <h3 className="text-lg font-bold">Visit Our Office</h3>
              <p className="text-sm">Visit our office in real life.</p>
              <p className="mt-3 text-primary dark:text-primary-400 font-bold">
                22/c Elementary Avenue, NY
              </p>
            </div>
            <div className="p-4">
              <span className="inline-flex p-2 mb-3 bg-indigo-50 rounded-full text-primary dark:text-primary-400">
                <Phone size={20} />
              </span>
              <h3 className="text-lg font-bold">Call Us Directly</h3>
              <p className="text-sm">Available during working hours.</p>
              <p className="mt-3 text-primary dark:text-primary-400 font-bold">
                (+1)234-4567-789
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
