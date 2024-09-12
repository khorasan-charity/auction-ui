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
import { Button, ButtonGroup, Checkbox, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [autoCameraDuration, setAutoCameraDuration] = useState("0");
  const [confettiDuration, setConfettiDuration] = useState("5");
  const [normalPaymentMaximum, setNormalPaymentMaximum] = useState("2000000");
  const [normalPaymentDuration, setNormalPaymentDuration] = useState("2");
  const [silverPaymentMaximum, setSilverPaymentMaximum] = useState("10000000");
  const [silverPaymentDuration, setSilverPaymentDuration] = useState("4");
  const [goldPaymentDuration, setGoldPaymentDuration] = useState("8");
  const [showMoneyShorter, setShowMoneyShorter] = useState("true");

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
    setAutoCameraDuration(settings?.autoCameraDuration || "0");
    setConfettiDuration(settings?.confettiDuration || "0");
    setNormalPaymentMaximum(settings?.normalPaymentMaximum || "0");
    setNormalPaymentDuration(settings?.normalPaymentDuration || "0");
    setSilverPaymentMaximum(settings?.silverPaymentMaximum || "0");
    setSilverPaymentDuration(settings?.silverPaymentDuration || "0");
    setGoldPaymentDuration(settings?.goldPaymentDuration || "0");
    setShowMoneyShorter(settings?.showMoneyShorter || "true");
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
            <Button
              color="success"
              onClick={() =>
                setSettingValue("goldPaymentDuration", goldPaymentDuration)
              }
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
