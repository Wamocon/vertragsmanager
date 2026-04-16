'use client';

import { createContext, useContext } from 'react';

interface OrgContextValue {
  organizationName: string;
  organizationShortName: string | null;
}

const OrgContext = createContext<OrgContextValue>({
  organizationName: '',
  organizationShortName: null,
});

export function OrgProvider({
  children,
  organizationName,
  organizationShortName,
}: {
  children: React.ReactNode;
  organizationName: string;
  organizationShortName: string | null;
}) {
  return (
    <OrgContext.Provider value={{ organizationName, organizationShortName }}>
      {children}
    </OrgContext.Provider>
  );
}

export function useOrg() {
  return useContext(OrgContext);
}

export function useOrgDisplayName() {
  const { organizationName, organizationShortName } = useOrg();
  return organizationShortName || organizationName;
}
