interface KPIItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

interface KPIBarProps {
  items: KPIItem[];
}

export function KPIBar({ items }: KPIBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          {item.icon ? (
            <>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg || 'bg-blue-100 dark:bg-blue-900/30'}`}>
                <div className={item.iconColor || 'text-blue-600 dark:text-blue-400'}>{item.icon}</div>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {typeof item.value === 'number' && (item.label.includes('Revenue') || item.label.includes('Value') || item.label.includes('Spent'))
                      ? `$${item.value.toLocaleString()}`
                      : item.value}
                  </h4>
                  {item.change && (
                    <span className={`text-sm ${
                      item.changeType === 'positive' ? 'text-green-600' :
                      item.changeType === 'negative' ? 'text-red-600' :
                      'text-gray-500'
                    }`}>
                      {item.change}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {typeof item.value === 'number' && (item.label.includes('Revenue') || item.label.includes('Value') || item.label.includes('Spent'))
                    ? `$${item.value.toLocaleString()}`
                    : item.value}
                </p>
                {item.change && (
                  <span className={`text-sm ${
                    item.changeType === 'positive' ? 'text-green-600' :
                    item.changeType === 'negative' ? 'text-red-600' :
                    'text-gray-500'
                  }`}>
                    {item.change}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
