'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SETTINGS } from '@/constant/pathname';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const days = ['월', '화', '수', '목', '금', '토', '일'];
const weekdayMap: Record<string, string> = {
  월: 'mon',
  화: 'tue',
  수: 'wed',
  목: 'thu',
  금: 'fri',
  토: 'sat',
  일: 'sun',
};
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

const formSchema = z
  .object({
    hour: z.string(),
    days: z.array(z.string()),
    enabled: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.enabled) {
      if (!data.hour) {
        ctx.addIssue({
          path: ['hour'],
          code: z.ZodIssueCode.custom,
          message: '시간을 선택해주세요',
        });
      }
      if (data.days.length === 0) {
        ctx.addIssue({
          path: ['days'],
          code: z.ZodIssueCode.custom,
          message: '하나 이상의 요일을 선택하세요',
        });
      }
    }
  });

export default function AlarmSettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      hour: '12',
      days: [],
      enabled: true,
    },
  });
  const { watch, setValue } = form;
  const enabled = watch('enabled');
  useEffect(() => {
    if (!enabled) {
      setValue('hour', '');
      setValue('days', []);
    }
  }, [enabled, setValue]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const payload = {
      hour: parseInt(values.hour),
      days: values.days.map((d) => weekdayMap[d]),
      enabled: values.enabled,
    };
    console.log(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='h-full flex flex-col'>
        <div className='grow space-y-4'>
          {/* 알림 활성화 */}
          <FormField
            control={form.control}
            name='enabled'
            render={({ field }) => (
              <FormItem className='flex items-center justify-between'>
                <FormLabel className='subTitle'>알림 활성화</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 시간 선택 */}
          <FormField
            control={form.control}
            name='hour'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel className='text-base font-semibold'>시간</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='시' />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map((h) => (
                        <SelectItem key={h} value={h}>
                          {h}시
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* 요일 선택 */}
          <FormField
            control={form.control}
            name='days'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel className='text-base font-semibold'>요일 선택</FormLabel>
                <FormControl>
                  <ToggleGroup type='multiple' value={field.value} onValueChange={field.onChange}>
                    {days.map((day) => (
                      <ToggleGroupItem key={day} value={day} className='px-3 py-1' variant='outline'>
                        {day}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-2 gap-2 p-4'>
          <Button variant='outline' asChild>
            <Link href={SETTINGS}>취소</Link>
          </Button>
          <Button type='submit'>선택</Button>
        </div>
      </form>
    </Form>
  );
}
