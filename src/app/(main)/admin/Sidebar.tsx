"use client";

import Box from "@/ui/Box";
import { getSettings, setSetting } from "@/services/settingService";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Coin } from "@/icons/Coin";
import { usePathname } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useSidebarCollapsed } from "@/context/SidebarContext";
import Money from "@/ui/Money";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [subjectTheme, setSubjectTheme] = useState("1");
  const [autoCameraDuration, setAutoCameraDuration] = useState("0");
  const [confettiDuration, setConfettiDuration] = useState("5");
  const [normalPaymentMaximum, setNormalPaymentMaximum] = useState("2000000");
  const [normalPaymentDuration, setNormalPaymentDuration] = useState("2");
  const [disableNormalPayment, setDisableNormalPayment] = useState("false");
  const [silverPaymentMaximum, setSilverPaymentMaximum] = useState("10000000");
  const [silverPaymentDuration, setSilverPaymentDuration] = useState("4");
  const [disableSilverPayment, setDisableSilverPayment] = useState("false");
  const [goldPaymentDuration, setGoldPaymentDuration] = useState("8");
  const [showMoneyShorter, setShowMoneyShorter] = useState("true");
  const [disableGoldPayment, setDisableGoldPayment] = useState("false");

  const { data: settings } = useQuery({
    queryKey: ["get-settings"],
    queryFn: getSettings,
    refetchInterval: 1000,
  });

  async function setSettingValue(key: string, value: string) {
    try {
      await setSetting(key, value);
      toast.success("اعمال شد");
    } catch (e) {
      console.log(e);
      toast.error("خطایی رخ داد!");
    }
  }

  useEffect(() => {
    setSubjectTheme(settings?.subjectTheme || "1");
    setAutoCameraDuration(settings?.autoCameraDuration || "0");
    setConfettiDuration(settings?.confettiDuration || "0");
    setNormalPaymentMaximum(settings?.normalPaymentMaximum || "0");
    setNormalPaymentDuration(settings?.normalPaymentDuration || "0");
    setDisableNormalPayment(settings?.disableNormalPayment || "false");
    setSilverPaymentMaximum(settings?.silverPaymentMaximum || "0");
    setSilverPaymentDuration(settings?.silverPaymentDuration || "0");
    setDisableSilverPayment(settings?.disableSilverPayment || "false");
    setGoldPaymentDuration(settings?.goldPaymentDuration || "0");
    setShowMoneyShorter(settings?.showMoneyShorter || "true");
    setDisableGoldPayment(settings?.disableGoldPayment || "false");
  }, [settings]);

  return (
    <Box className="h-full w-[300px] px-2 relative overflow-y-auto !pt-0 rounded-none md:rounded-xl">
      <Box.Header className="sticky bg-white dark:bg-neutral-800 inset-x-0 top-0 pt-4 pb-4 w-full flex items-center justify-center">
        <strong className="font-bold text-xl">تنظیمات کلی</strong>
      </Box.Header>

      <Box.Body className="overflow-y-auto h-[calc(100vh-10rem)] p-0 px-1">
        <div className="overflow-y-auto w-full flex flex-col gap-3">
          <ButtonGroup>
            <Button
              color="success"
              onClick={() => setSettingValue("camera", "on")}
            >
              نمایش دوربین
            </Button>
            <Button
              color="danger"
              onClick={() => setSettingValue("camera", "off")}
            >
              عدم نمایش دوربین
            </Button>
          </ButtonGroup>

          <div className="flex flex-col justify-center items-center gap-y-2 border-1 rounded-md p-2 bg-slate-200">
            <span>قالب موضوعات</span>
            <RadioGroup
              value={subjectTheme}
              onValueChange={(e) => setSubjectTheme(e)}
              color="success"
            >
              <Radio value="1">قالب ۱</Radio>
              <Radio value="2">قالب ۲</Radio>
              <Radio value="3">قالب ۳</Radio>
            </RadioGroup>
            <Button
              color="success"
              onClick={() => setSettingValue("subjectTheme", subjectTheme)}
            >
              اعمال
            </Button>
          </div>

          <div className="flex flex-col justify-center items-center gap-y-2 border-1 rounded-md p-2 bg-slate-200">
            <span>مدت نمایش کاغذ رنگی (ثانیه)</span>
            <div className="flex flex-row gap-x-2">
              <Input
                placeholder="ثانیه"
                value={confettiDuration}
                onChange={(e) => setConfettiDuration(e.target.value)}
                dir="ltr"
              />
              <Button
                color="success"
                onClick={() =>
                  setSettingValue("confettiDuration", confettiDuration)
                }
              >
                اعمال
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-y-2 border-1 rounded-md p-2 bg-slate-200">
            <span>مدت نمایش خودکار دوربین پس از تکمیل یک موضوع (ثانیه)</span>
            <div className="flex flex-row gap-x-2">
              <Input
                placeholder="ثانیه"
                value={autoCameraDuration}
                onChange={(e) => setAutoCameraDuration(e.target.value)}
                dir="ltr"
              />
              <Button
                color="success"
                onClick={() =>
                  setSettingValue("autoCameraDuration", autoCameraDuration)
                }
              >
                اعمال
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-y-2 border-1 rounded-md p-2 bg-slate-200">
            <span>پرداخت‌های عادی</span>
            <Input
              label="از صفر تا مبلغ (تومان)"
              value={normalPaymentMaximum}
              onChange={(e) => setNormalPaymentMaximum(e.target.value)}
              dir="ltr"
            />
            <Money amount={parseInt(normalPaymentMaximum)} />
            <Input
              label="مکث (ثانیه)"
              value={normalPaymentDuration}
              onChange={(e) => setNormalPaymentDuration(e.target.value)}
              dir="ltr"
            />
            <Checkbox
              color="success"
              isSelected={disableNormalPayment == "true"}
              onValueChange={(value) =>
                setDisableNormalPayment(value ? "true" : "false")
              }
            >
              غیرفعال
            </Checkbox>
            <Button
              color="success"
              onClick={async () => {
                await setSettingValue(
                  "normalPaymentMaximum",
                  normalPaymentMaximum
                );
                await setSettingValue(
                  "normalPaymentDuration",
                  normalPaymentDuration
                );
                await setSettingValue(
                  "disableNormalPayment",
                  disableNormalPayment
                );
              }}
            >
              اعمال
            </Button>
          </div>

          <div className="flex flex-col justify-center items-center gap-y-2 border-1 rounded-md p-2 bg-slate-200">
            <span>پرداخت‌های نقره‌ای</span>
            <Input
              label="از عادی تا مبلغ (تومان)"
              value={silverPaymentMaximum}
              onChange={(e) => setSilverPaymentMaximum(e.target.value)}
              dir="ltr"
            />
            <Money amount={parseInt(silverPaymentMaximum)} />
            <Input
              label="مکث (ثانیه)"
              value={silverPaymentDuration}
              onChange={(e) => setSilverPaymentDuration(e.target.value)}
              dir="ltr"
            />
            <Checkbox
              color="success"
              isSelected={disableSilverPayment == "true"}
              onValueChange={(value) =>
                setDisableSilverPayment(value ? "true" : "false")
              }
            >
              غیرفعال
            </Checkbox>
            <Button
              color="success"
              onClick={async () => {
                await setSettingValue(
                  "silverPaymentMaximum",
                  silverPaymentMaximum
                );
                await setSettingValue(
                  "silverPaymentDuration",
                  silverPaymentDuration
                );
                await setSettingValue(
                  "disableSilverPayment",
                  disableSilverPayment
                );
              }}
            >
              اعمال
            </Button>
          </div>

          <div className="flex flex-col justify-center items-center gap-y-2 border-1 rounded-md p-2 bg-slate-200">
            <span>پرداخت‌های طلایی</span>
            <Input
              label="مکث (ثانیه)"
              value={goldPaymentDuration}
              onChange={(e) => setGoldPaymentDuration(e.target.value)}
              dir="ltr"
            />
            <Checkbox
              color="success"
              isSelected={disableGoldPayment == "true"}
              onValueChange={(value) =>
                setDisableGoldPayment(value ? "true" : "false")
              }
            >
              غیرفعال
            </Checkbox>
            <Button
              color="success"
              onClick={async () => {
                await setSettingValue(
                  "goldPaymentDuration",
                  goldPaymentDuration
                );
                await setSettingValue("disableGoldPayment", disableGoldPayment);
              }}
            >
              اعمال
            </Button>
          </div>

          <div className="flex flex-col justify-center items-center gap-y-2 border-1 rounded-md p-2 bg-slate-200">
            <Checkbox
              color="success"
              isSelected={showMoneyShorter == "true"}
              onValueChange={(value) =>
                setShowMoneyShorter(value ? "true" : "false")
              }
            >
              نمایش خلاصه‌تر مقدار پول
            </Checkbox>
            <Button
              color="success"
              onClick={() =>
                setSettingValue("showMoneyShorter", showMoneyShorter)
              }
            >
              اعمال
            </Button>
          </div>
        </div>
      </Box.Body>
    </Box>
  );
};

export default Sidebar;
