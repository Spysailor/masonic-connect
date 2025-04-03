-- Activation de RLS sur toutes les tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lodges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lodge_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

---------------------------
-- POLITIQUES PROFILES --
---------------------------

-- Tous les utilisateurs peuvent voir leurs profils
CREATE POLICY "Les utilisateurs peuvent voir leurs profils" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Tout utilisateur peut mettre à jour son propre profil
CREATE POLICY "Les utilisateurs peuvent modifier leurs profils" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Les utilisateurs peuvent voir les profils des membres de leurs loges
CREATE POLICY "Voir les profils des membres de sa loge" 
ON public.profiles FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.lodge_memberships AS my_memberships
    JOIN public.lodge_memberships AS their_memberships 
    ON my_memberships.lodge_id = their_memberships.lodge_id
    WHERE my_memberships.user_id = auth.uid()
    AND their_memberships.user_id = profiles.id
    AND my_memberships.is_active = true
    AND their_memberships.is_active = true
  )
);

------------------------
-- POLITIQUES LODGES --
------------------------

-- Les utilisateurs peuvent voir les loges dont ils sont membres
CREATE POLICY "Voir les loges dont on est membre" 
ON public.lodges FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.lodge_memberships
    WHERE lodge_memberships.lodge_id = lodges.id 
    AND lodge_memberships.user_id = auth.uid()
    AND lodge_memberships.is_active = true
  )
);

-- Seuls les admins peuvent modifier une loge
CREATE POLICY "Seuls les admins peuvent modifier une loge" 
ON public.lodges FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 
    FROM public.lodge_memberships
    WHERE lodge_memberships.lodge_id = lodges.id 
    AND lodge_memberships.user_id = auth.uid()
    AND lodge_memberships.role = 'admin'
    AND lodge_memberships.is_active = true
  )
);

-- Seuls les super-admins peuvent créer une loge
CREATE POLICY "Seuls les super-admins peuvent créer une loge" 
ON public.lodges FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'super_admin'
  )
);

-----------------------------------
-- POLITIQUES LODGE_MEMBERSHIPS --
-----------------------------------

-- Les utilisateurs peuvent voir les adhésions de leurs loges
CREATE POLICY "Voir les adhésions des membres de sa loge" 
ON public.lodge_memberships FOR SELECT 
USING (
  lodge_id IN (
    SELECT lodge_id 
    FROM public.lodge_memberships
    WHERE user_id = auth.uid()
    AND is_active = true
  )
);

-- Les utilisateurs peuvent voir leurs propres adhésions
CREATE POLICY "Voir ses propres adhésions" 
ON public.lodge_memberships FOR SELECT 
USING (user_id = auth.uid());

-- Seuls les admins peuvent modifier des adhésions
CREATE POLICY "Seuls les admins peuvent modifier des adhésions" 
ON public.lodge_memberships FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 
    FROM public.lodge_memberships AS admin_membership
    WHERE admin_membership.lodge_id = lodge_memberships.lodge_id 
    AND admin_membership.user_id = auth.uid()
    AND admin_membership.role = 'admin'
    AND admin_membership.is_active = true
  )
);

-- Seuls les admins peuvent ajouter des adhésions
CREATE POLICY "Seuls les admins peuvent ajouter des adhésions" 
ON public.lodge_memberships FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.lodge_memberships AS admin_membership
    WHERE admin_membership.lodge_id = lodge_memberships.lodge_id 
    AND admin_membership.user_id = auth.uid()
    AND admin_membership.role = 'admin'
    AND admin_membership.is_active = true
  )
);

------------------------
-- POLITIQUES TENUES --
------------------------

-- Les membres peuvent voir les tenues de leurs loges
CREATE POLICY "Voir les tenues de sa loge" 
ON public.tenues FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.lodge_memberships
    WHERE lodge_memberships.lodge_id = tenues.lodge_id 
    AND lodge_memberships.user_id = auth.uid()
    AND lodge_memberships.is_active = true
  )
);

-- Seuls les admins/officiers peuvent créer des tenues
CREATE POLICY "Seuls les admins/officiers peuvent créer des tenues" 
ON public.tenues FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.lodge_memberships
    WHERE lodge_memberships.lodge_id = tenues.lodge_id 
    AND lodge_memberships.user_id = auth.uid()
    AND (
      lodge_memberships.role = 'admin' 
      OR lodge_memberships.office IS NOT NULL
    )
    AND lodge_memberships.is_active = true
  )
);

-- Seuls les admins/officiers peuvent modifier des tenues
CREATE POLICY "Seuls les admins/officiers peuvent modifier des tenues" 
ON public.tenues FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 
    FROM public.lodge_memberships
    WHERE lodge_memberships.lodge_id = tenues.lodge_id 
    AND lodge_memberships.user_id = auth.uid()
    AND (
      lodge_memberships.role = 'admin' 
      OR lodge_memberships.office IS NOT NULL
    )
    AND lodge_memberships.is_active = true
  )
);

-- Seuls les admins/officiers peuvent supprimer des tenues
CREATE POLICY "Seuls les admins/officiers peuvent supprimer des tenues" 
ON public.tenues FOR DELETE 
USING (
  EXISTS (
    SELECT 1 
    FROM public.lodge_memberships
    WHERE lodge_memberships.lodge_id = tenues.lodge_id 
    AND lodge_memberships.user_id = auth.uid()
    AND (
      lodge_memberships.role = 'admin' 
      OR lodge_memberships.office IS NOT NULL
    )
    AND lodge_memberships.is_active = true
  )
);

----------------------------
-- POLITIQUES ATTENDANCE --
----------------------------

-- Les membres peuvent voir l'assistance aux tenues de leurs loges
CREATE POLICY "Voir l'assistance aux tenues de sa loge" 
ON public.attendance FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.tenues
    JOIN public.lodge_memberships 
    ON tenues.lodge_id = lodge_memberships.lodge_id
    WHERE tenues.id = attendance.tenue_id
    AND lodge_memberships.user_id = auth.uid()
    AND lodge_memberships.is_active = true
  )
);

-- Les membres peuvent mettre à jour leur propre assistance
CREATE POLICY "Mettre à jour sa propre assistance" 
ON public.attendance FOR UPDATE 
USING (user_id = auth.uid());

-- Les membres peuvent insérer leur propre assistance
CREATE POLICY "Insérer sa propre assistance" 
ON public.attendance FOR INSERT 
WITH CHECK (user_id = auth.uid());

-- Les admins/officiers peuvent mettre à jour l'assistance de tous les membres
CREATE POLICY "Les admins/officiers peuvent mettre à jour toutes les assistances" 
ON public.attendance FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 
    FROM public.tenues
    JOIN public.lodge_memberships 
    ON tenues.lodge_id = lodge_memberships.lodge_id
    WHERE tenues.id = attendance.tenue_id
    AND lodge_memberships.user_id = auth.uid()
    AND (
      lodge_memberships.role = 'admin' 
      OR lodge_memberships.office IS NOT NULL
    )
    AND lodge_memberships.is_active = true
  )
);

--------------------------
-- POLITIQUES PLANCHES --
--------------------------

-- Les membres peuvent voir les planches de leurs loges (respectant leur degré)
CREATE POLICY "Voir les planches de sa loge selon son degré" 
ON public.planches FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.lodge_memberships
    WHERE lodge_memberships.lodge_id = planches.lodge_id 
    AND lodge_memberships.user_id = auth.uid()
    AND lodge_memberships.degree >= COALESCE(planches.degree, 1)
    AND lodge_memberships.is_active = true
  )
);

-- Les membres peuvent créer des planches dans leurs loges
CREATE POLICY "Créer des planches dans sa loge" 
ON public.planches FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.lodge_memberships
    WHERE lodge_memberships.lodge_id = planches.lodge_id 
    AND lodge_memberships.user_id = auth.uid()
    AND lodge_memberships.is_active = true
  )
  AND auth.uid() = author_id
);

-- L'auteur peut mettre à jour ses propres planches
CREATE POLICY "Mettre à jour ses propres planches" 
ON public.planches FOR UPDATE 
USING (author_id = auth.uid());

-- Les admins peuvent mettre à jour toutes les planches
CREATE POLICY "Les admins peuvent mettre à jour toutes les planches" 
ON public.planches FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 
    FROM public.lodge_memberships
    WHERE lodge_memberships.lodge_id = planches.lodge_id 
    AND lodge_memberships.user_id = auth.uid()
    AND lodge_memberships.role = 'admin'
    AND lodge_memberships.is_active = true
  )
);

-- Politiques supplémentaires pour les autres tables (messages, documents, etc.) suivraient le même modèle...
