import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';
import React, { FC } from 'react';

type CInputSkillProps = {
  form: any;
  name: string;
  label: string;
};

const CInputSkill: FC<CInputSkillProps> = ({ form, name, label }) => {
  const [isHide, setIsHide] = React.useState<boolean>(false);
  const [values, setValues] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>();

  const handleSaveValue = () => {
    const value = inputRef.current?.value;

    if (value === '') {
      return;
    }

    const newValue: any = [...values, value];

    setValues(newValue);

    form.setValue(name, newValue);
  };

  const handleDeleteValue = (item: string) => {
    const skills: any = values.filter((value: string) => item !== value);

    setValues(skills);
    form.setValue(name, skills);
  };

  React.useEffect(() => {
    const val = form.getValues(name);

    if (val && val.length > 0) {
      setValues(val);
    }
  }, [form, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="block">{label}</FormLabel>
          <FormControl>
            <>
              <Button
                type="button"
                variant={'ghost'}
                className="mb-2"
                onClick={() => setIsHide(!isHide)}
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                {label}
              </Button>

              {isHide && (
                <div className="my-4 flex flex-row gap-4">
                  <Input ref={inputRef} className="w-[246px]" />

                  <Button type="button" onClick={handleSaveValue}>
                    Save
                  </Button>
                </div>
              )}

              <div className="space-y-3 gap-3">
                {values.map((item: string, index: number) => (
                  <Badge
                    variant={'outline'}
                    key={index}
                    onClick={() => handleDeleteValue(item)}
                  >
                    {item}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Badge>
                ))}
              </div>
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CInputSkill;
