package com.lostfound.repository;

import com.lostfound.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {

    List<Claim> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Claim> findByItemIdOrderByCreatedAtDesc(String itemId);

    List<Claim> findAllByOrderByCreatedAtDesc();

    boolean existsByUserIdAndItemId(Long userId, String itemId);

    long countByStatus(String status);
}
